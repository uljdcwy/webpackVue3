console.log(456);
alert(456);
async  function test(){
    await new Promise(function(su,fa){
        setTimeout(su,300)
    });
};

import testscss from "./../public/test.scss";
console.log(testscss,"testscss")


test();