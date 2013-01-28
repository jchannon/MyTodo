"use strict";

$(document).ready(function() {
  
  var raw = (localStorage.getItem("todoItems", todoItems) || "[]");
  var todoItems = JSON.parse(raw);

  var arr = todoItems.map(function(x){return x.id;});

  var maxValue = Math.max.apply(Math, arr);

  if (maxValue === -Infinity){
    maxValue = 0;
  }

  var identifier = maxValue;

  var todoItemComplete = "<li>{0}<a href='#' data-val='{1}' class='close'>Close</a><input type='checkbox' class='complete' data-val='{1}' checked='checked'></li>";
  var todoItem = "<li>{0}<a href='#' data-val='{1}' class='close'>Close</a><input type='checkbox' class='complete' data-val='{1}'></li>";

  if (todoItems.length > 0) {
    todoItems.forEach(function(element, index, array) {
      if (element.complete) {
       $('#items').append(
              getItem(element, true)
            );
      }
      else {
        $('#items').append(
               getItem(element, false)
            );
      }
     
    });
  }

  $("#submit").click(function() {
    identifier++;
    var todo = new TODO($("#item").val(), identifier);

    todoItems.push(todo);
    
   $('#items').append(
              todoItem.replace("{0}", $("#item").val() + " ").replace("{1}", identifier)
            );

   $('#item').val("");

  localStorage.setItem("todoItems", JSON.stringify(todoItems));

  });

   $(document).on('click', '.close', function (e) {
            e.preventDefault();
            var id = parseInt($(this).attr('data-val'));
            var item = todoItems.filter(function(x){return x.id === id;})[0];
            var index = todoItems.indexOf(item);
            todoItems.splice(index, 1);

            $(this).parent().remove();

            identifier--;

            localStorage.setItem("todoItems", JSON.stringify(todoItems));
        });

   $(document).on('change', '.complete', function (e) {
            e.preventDefault();
            var id = parseInt($(this).attr('data-val'));
            var item = todoItems.filter(function(x){return x.id === id;})[0];
            item.complete = true;

            localStorage.setItem("todoItems", JSON.stringify(todoItems));
        });

    $("#clearDB").click(function() {
        localStorage.removeItem("todoItems");
    });

    function getItem(element, complete)
    {
      if (complete)
      {
        return todoItemComplete.replace("{0}", element.text + " ").replace("{1}", element.id);
      }
      else
      {
        return todoItem.replace("{0}", element.text + " ").replace("{1}", element.id);
      }
    }


});



