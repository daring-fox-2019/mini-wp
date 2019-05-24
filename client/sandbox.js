
function a(whichOne){
    let showHide={
        readOne: false,
        allArticles: true
    }
    Object.keys(showHide).map(function(key){
        if(key === whichOne){
            console.log('hello')
        }else{
            console.log('tetot')
        }
    })
}

a('readOne')
