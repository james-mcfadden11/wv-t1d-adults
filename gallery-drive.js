// Renders the Photo Gallery page, populated live from a public Google Drive folder.
// Each subfolder of FOLDER_ID is treated as a year and its photos are grouped
// together (newest subfolder first, no visible label); any photos left directly
// in FOLDER_ID are shown after all the year groups.
// Requires a browser API key restricted to the Drive API + this site's domain.
(function () {
    var FOLDER_ID = '1BT_miKec6jmGBonN8oi-KzWEQGXAqdIV';
    var API_KEY = 'AIzaSyDbZ9A_TCamnH_KNTO2HVCHW6FcfQFAHHU';
    var API_BASE = 'https://www.googleapis.com/drive/v3/files';

    var container = document.getElementById('galleryContainer');
    if (!container) return;

    function driveFetch(params) {
        var url = API_BASE + '?' + Object.keys(params).map(function (key) {
            return key + '=' + encodeURIComponent(params[key]);
        }).join('&') + '&key=' + API_KEY;

        return fetch(url).then(function (res) {
            if (!res.ok) throw new Error('Drive API error: ' + res.status);
            return res.json();
        });
    }

    function largeThumbnail(thumbnailLink) {
        return thumbnailLink.replace(/=s\d+$/, '=s1000');
    }

    function buildGrid(files) {
        var grid = document.createElement('div');
        grid.className = 'gallery-grid';

        files.forEach(function (file) {
            if (!file.thumbnailLink) return;
            var item = document.createElement('div');
            item.className = 'gallery-item';

            var img = document.createElement('img');
            img.src = largeThumbnail(file.thumbnailLink);
            img.alt = 'Gallery photo';
            img.loading = 'lazy';
            img.referrerPolicy = 'no-referrer';

            item.appendChild(img);
            grid.appendChild(item);
        });

        return grid;
    }

    function listImages(parentId) {
        var query = "'" + parentId + "' in parents and mimeType contains 'image/' and trashed = false";
        return driveFetch({
            q: query,
            fields: 'files(id,thumbnailLink)',
            orderBy: 'createdTime',
            pageSize: '1000'
        }).then(function (data) { return data.files || []; });
    }

    function listSubfolders(parentId) {
        var query = "'" + parentId + "' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false";
        return driveFetch({
            q: query,
            fields: 'files(id,name)',
            pageSize: '1000'
        }).then(function (data) { return data.files || []; });
    }

    Promise.all([listSubfolders(FOLDER_ID), listImages(FOLDER_ID)])
        .then(function (results) {
            var subfolders = results[0];
            var rootImages = results[1];

            subfolders.sort(function (a, b) {
                return b.name.localeCompare(a.name, undefined, { numeric: true });
            });

            return Promise.all(subfolders.map(function (folder) {
                return listImages(folder.id).then(function (images) {
                    return { name: folder.name, images: images };
                });
            })).then(function (sections) {
                return { sections: sections, rootImages: rootImages };
            });
        })
        .then(function (result) {
            container.innerHTML = '';

            var hasAnyPhotos = result.rootImages.length > 0 ||
                result.sections.some(function (s) { return s.images.length > 0; });

            if (!hasAnyPhotos) {
                container.innerHTML = '<p>No photos yet &mdash; check back soon!</p>';
                return;
            }

            result.sections.forEach(function (section) {
                if (section.images.length === 0) return;
                container.appendChild(buildGrid(section.images));
            });

            if (result.rootImages.length > 0) {
                container.appendChild(buildGrid(result.rootImages));
            }
        })
        .catch(function (err) {
            console.error(err);
            container.innerHTML = '<p>Unable to load photos right now. Please check back later.</p>';
        });
})();
