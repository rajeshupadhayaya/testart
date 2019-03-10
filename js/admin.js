$(document).ready(function () {

    $('#sidebarCollapse').on('click', function () {
            $('#sidebar').toggleClass('active');
        });

    $('#article_content').trumbowyg({
    	btnsDef: {
            // Create a new dropdown
            image: {
                dropdown: ['insertImage', 'base64'],
                ico: 'insertImage'
            }
        },
    	btns:[
    		['viewHTML'],
            ['undo', 'redo'], // Only supported in Blink browsers
            ['formatting'],
            ['strong', 'em', 'del'],
            ['superscript', 'subscript'],
            ['link'],
            ['image'],
            ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
            ['unorderedList', 'orderedList'],
            ['horizontalRule'],
            ['removeformat'],
            ['fullscreen'],
            ['lineheight'],
            ['fontsize'],['fontfamily'],['colors'],
    		['table']
    		],
    	autogrow: true,
    	semantic: false,
    	// imageWidthModalEdit: true,
    	resetCss: true,
    	// autogrowOnEnter: true
    	
    });

    //sub_category auto suggestion
    $('#sub_category').typeahead({

        source: function (query, result) {
            $.ajax({
                url: "api/getsubcategory",
                data: 'query=' + query,            
                dataType: "json",
                type: "GET",
                success: function (data) {
                    result($.map(data, function (item) {
                        return item['sub_category_name'];
                    }));
                }
            });
        }
    }); 
    //category auto suggestion
    $('#category_name').typeahead({

        source: function (query, result) {
            $.ajax({
                url: "api/getcategory",
                data: 'query=' + query,            
                dataType: "json",
                type: "GET",
                success: function (data) {
                    result($.map(data, function (item) {
                        return item['name'];
                    }));
                }
            });
        }
    }); 


    //article-title auto suggestion
    $('#title').typeahead({
        source: function (query, result) {
            $.ajax({
                url: "api/getarticletitle",
                data: 'query=' + query,            
                dataType: "json",
                type: "GET",
                success: function (data) {
                    result($.map(data, function (item) {
                        return item['title'];
                    }));
                }
            });
        }
    }); 

});





$('#articledate').datepicker({
    uiLibrary: 'bootstrap4'
});


//Logic for autosave
var data_change = false;
$('#article_form').change(function(){
    data_change = true;
});
var prev_form_data = ''

var autosave = setInterval(function () {

    current_form_data = $("#article_form").serialize();
    
    // console.log(current_form_data);

    if (data_change){

        if (prev_form_data != current_form_data){

            prev_form_data = current_form_data;
            
            $('#autosave_msg').html('Saving....');
                
            var url = 'api/autosave';
            $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });

            $.ajax({
               cache: false,
               type: "POST",
               url: url,
               dataType: 'json',
               data: $("#article_form").serialize(), // serializes the form's elements.
               success: function(data)
               {
                    $('#autosave_id').val(data['id']);
                    $('#autosave_msg').html('Draft Saved'); // show response from the php script.
               },
               error: function (data) {
                    alert('No internet connection');

                },
             });
        }
    } 
},10000)

