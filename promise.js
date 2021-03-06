/**
 * Created by Dell on 2017. 03. 05..
 */
var request=require('request');
var hget=require('hget');
var marked=require('marked');
var Term=require('marked-terminal');

function getRandomPonyFooArticle(){
    return new Promise((resolve,reject) => {
        request('https://ponyfoo.com/articles/random',(err, res, body) => {
            if(err){
                reject(err);return;
            }
            resolve(body);
        })
    });
}

printRandomArticle();

function printRandomArticle(){
    getRandomPonyFooArticle()
        .then(html => hget(html,{
            markdown:true,
            root:'main',
            ignore:'.at-subscribe,.mm-comments,.de-sidebar'
        })).then(md => marked(md,{
            renderer: new Term()
    }))
    .then(txt => console.log(txt))
    .catch(reason => console.error(reason));

}