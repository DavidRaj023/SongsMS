exports.QUERY_INSERT ="INSERT INTO [dbo].[songs] (name,type,albumName,composerName,singerName,genreNames,hasLyrics,durationInSec,releaseDate) VALUES (@name,@type,@albumName,@composerName,@singerName,@genreNames,@hasLyrics,@durationInSec,@releaseDate)";
exports.QUERY_GETALLDATA = "SELECT * FROM [dbo].[songs];"
exports.QUERY_GETALLWHERE = "SELECT * FROM [dbo].[songs] WHERE "
exports.QUERY_GETALLNAME = "SELECT name FROM [dbo].[songs];"
exports.EXPORT_EXCEL = './data/Songs_Export.xlsx';
exports.EXPORT_SEARCH = './data/Songs_Search_Export.xlsx';
exports.SUCCESS_EXCEL_EXPORT = "Excel exported successfully"

exports.HEADER = [
    {header: 'Song_ID', key: 'songId', width: 10},
    {header: 'Name', key: 'name', width: 30},
    {header: 'Type', key: 'type', width: 15},
    {header: 'Album Name', key: 'albumName', width: 20},
    {header: 'Composer Name', key: 'composerName', width: 20},
    {header: 'Singer Name', key: 'singerName', width: 20},
    {header: 'Genre', key: 'genreNames', width: 15},
    {header: 'Lyrics', key: 'hasLyrics', width: 10},
    {header: 'Duration In Sec', key: 'durationInSec', width: 10},
    {header: 'Release Date', key: 'releaseDate', width: 15},
];
exports.TEMP_UP_FILE = '../../resources/static/assets/uploads/fileExport-Song_Upload.xlsx';