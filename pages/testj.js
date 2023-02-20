console.log(456);
alert(456);
async  function test(){
    await new Promise(function(su,fa){
        setTimeout(su,300)
    });
}

test();