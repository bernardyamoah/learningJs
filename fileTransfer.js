

var ImgName,ImgUrl;
var files=[]
var reader


var FileInput = document.getElementById('file_input')
var File = document.getElementById('file_input-text')


FileInput.onchange=e=>{
    // e.preventDefault();
    files=e.target.files;
    reader=new FileReader();

        reader.onload=function(){
        document.getElementById('myProfile').src = reader.result
    }
        reader.readAsDataURL(files[0]);
}
FileInput.click()


    // for(var i=0;i<files.length;i++){
    //     reader=new FileReader();
    //     reader.readAsDataURL(files[i]);
    //     reader.onload=function(e){
    //         ImgName=files[i].name;
    //         console.log(ImgName)
    //         ImgUrl=e.target.result;

//     const fileTransferProgress=document.getElementById('fileTransferProgress')
// ImgName=document.getElementById().value
// -UPLOAD PROCESS
document.getElementById('upload').onclick = function(){
    ImgName = document.getElementById('namebox').value;
    var uploadTask = firebase.storage().ref('Images/'+ ImgName +".png").put(files[0]);
    uploadTask.on('state_changed', function(snapshot){
        var progress = (snapshot.bytesTranferred / snapshot.totalBytes) * 100;
        document.getElementById('fileTransferProgress').style.width=`${progress}%`;
        
    },
    function(error){
        console.log(error)
    },
    function(){
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
            ImgUrl=downloadURL;
            console.log(ImgUrl)
            firebase.database.ref('Pictures/'+ImgName).set({
                Name:ImgName,
                Url:ImgUrl
            });
            iziToast.success({
                title: 'Success',
                message: 'Image successfully added',
            })
            
        });

    }
    
    );
}
