const request = require('request');
const movie_database = " http://www.omdbapi.com/?i=tt3896198&apikey=38e90937";
const moviedb_url = "http://www.omdbapi.com/?";
const moviedb_key = "&apikey=38e90937";


const movie_database_request = (imdb_id,title, callback) => {
    if(imdb_id)
    {
        const url_request = moviedb_url + "i=" + imdb_id + moviedb_key;
        movie_request(url_request, (error, movie_info) => {
            if(error)
            {
                return callback(error, undefined)
            }
            

            callback(undefined, movie_info)
        });

    }else if(title)
    {
        const url_request = moviedb_url + "t=" + encodeURIComponent(title) + moviedb_key;
        movie_request(url_request, (error, movie_info) => {
            if(error)
            {
                return callback(error, undefined)
            }
          
            callback(undefined,movie_info)
        });
    }
}


const movie_request = (url, callback) =>
{
    request({url: url, json: true}, (error, {body}) => {
        if(error)
        {
            callback("Unable to connect to Service", undefined);
        }else if(body.Error)
        {
            callback("The id or title was bad", undefined);
        }else{
            callback(undefined, {
                Title: body.Title,
                Rated: body.Rated,
                Genre: body.Genre,
                Language: body.Language
            })
        }
    })
}





module.exports = movie_database_request