
$('.arrow').on('click',function(){
    $('.container-fluid').fadeOut('slow');
    $('.hideIt').removeClass('hideIt');
    setTimeout(function(){
        $('.wider').fadeIn('slow');
    },500)
    
});
            
