exports.QUERY_INSERT ="INSERT INTO [dbo].[songs] (name,type,albumName,composerName,singerName,genreNames,hasLyrics,durationInSec,releaseDate) VALUES (@name,@type,@albumName,@composerName,@singerName,@genreNames,@hasLyrics,@durationInSec,@releaseDate)";
exports.QUERY_GETALLDATA = "SELECT * FROM [dbo].[songs];"
exports.QUERY_GETALLNAME = "SELECT name FROM [dbo].[songs];"

exports.HEADER = [
    {header: 'Emp_Id', key: 'empId', width: 10},
    {header: 'name', key: 'name', width: 10},
    {header: 'Phone', key: 'phone', width: 15},
    {header: 'Age', key: 'age', width: 10},
    {header: 'Gender', key: 'gender', width: 10},
    {header: 'Department', key: 'gender', width: 10},
    {header: 'DOJ', key: 'doj', width: 15},
    {header: 'Salary', key: 'salary', width: 10},
];
