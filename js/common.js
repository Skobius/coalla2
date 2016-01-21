jQuery(document).ready(function(){

	jQuery(".niceCheck").mousedown(
	/* при клике на чекбоксе меняем его вид и значение */
	function() {

	     changeCheck(jQuery(this));
	     
	});


	jQuery(".niceCheck").each(
	/* при загрузке страницы нужно проверить какое значение имеет чекбокс и в соответствии с ним выставить вид */
	function() {
	     
	     changeCheckStart(jQuery(this));
	     
	});


	jQuery(".niceCheck2").mousedown(
	/* при клике на чекбоксе меняем его вид и значение */
	function() {

	     changeCheck(jQuery(this));
	     
	});


	jQuery(".niceCheck2").each(
	/* при загрузке страницы нужно проверить какое значение имеет чекбокс и в соответствии с ним выставить вид */
	function() {
	     
	     changeCheckStart(jQuery(this));
	     
	});


	jQuery(".niceRadio").each(
	/* при загрузке страницы меняем обычные на стильные radio */
	function() {
	     
	     changeRadioStart(jQuery(this));
	     
	});

	jQuery(".niceRadio2").each(
	/* при загрузке страницы меняем обычные на стильные radio */
	function() {
	     
	     changeRadioStart2(jQuery(this));
	     
	});

	$("ul").hide();
	$("h3 span").click(function(){
		$(this).parent().next().slideToggle();
	});
    /*      
    $(".expand2").click(function(){
            $(".expand2").css({transition:'all 1s',transform:'rotate(180deg) translate(0px,0px)'});
    });     
*/

	var angle=0;
    $(".expand2").click(function () {   
  		$(".expand2").rotate({animateTo:angle+=180 % 360});
   	});              
});

function changeCheck(el)
/* 
	функция смены вида и значения чекбокса
	el - span контейнер дял обычного чекбокса
	input - чекбокс
*/
{
     var el = el,
          input = el.find("input").eq(0);
   	 if(!input.attr("checked")) {
		el.css("background-position","0 -16px");	
		input.attr("checked", true)
	} else {
		el.css("background-position","0 0");	
		input.attr("checked", false)
	}
     return true;
}

function changeCheckStart(el)
/* 
	если установлен атрибут checked, меняем вид чекбокса
*/
{
var el = el,
		input = el.find("input").eq(0);
      if(input.attr("checked")) {
		el.css("background-position","0 -16px");	
		}
     return true;
}



function changeRadio(el)
/* 
	функция смены вида и значения radio при клике на контейнер
*/
{

	var el = el,
		input = el.find("input").eq(0);
	var nm=input.attr("name");
		
	jQuery(".niceRadio input").each(
	
	function() {
     
		if(jQuery(this).attr("name")==nm)
		{
			jQuery(this).parent().removeClass("radioChecked");
		}
	   
	   
	});					  
	
	
	if(el.attr("class").indexOf("niceRadioDisabled")==-1)
	{	
		el.addClass("radioChecked");
		input.attr("checked", true);
	}
	
    return true;
}
function changeRadio2(el)
/* 
	функция смены вида и значения radio при клике на контейнер
*/
{

	var el = el,
		input = el.find("input").eq(0);
	var nm=input.attr("name");
		
	jQuery(".niceRadio2 input").each(
	
	function() {
     
		if(jQuery(this).attr("name")==nm)
		{
			jQuery(this).parent().removeClass("radioChecked");
		}
	   
	   
	});					  
	
	
	if(el.attr("class").indexOf("niceRadioDisabled")==-1)
	{	
		el.addClass("radioChecked");
		input.attr("checked", true);
	}
	
    return true;
}

function changeVisualRadio(input)
{
/*
	меняем вид radio при смене значения
*/
	var wrapInput = input.parent();
	var nm=input.attr("name");
		
	jQuery(".niceRadio input").each(
	
	function() {
     
		if(jQuery(this).attr("name")==nm)
		{
			jQuery(this).parent().removeClass("radioChecked");
		}
	   
	   
	});

	if(input.attr("checked")) 
	{
		wrapInput.addClass("radioChecked");
	}
}
function changeVisualRadio2(input)
{
/*
	меняем вид radio при смене значения
*/
	var wrapInput = input.parent();
	var nm=input.attr("name");
		
	jQuery(".niceRadio2 input").each(
	
	function() {
     
		if(jQuery(this).attr("name")==nm)
		{
			jQuery(this).parent().removeClass("radioChecked");
		}
	   
	   
	});

	if(input.attr("checked")) 
	{
		wrapInput.addClass("radioChecked");
	}
}


function changeRadioStart(el)
/* 
	новый контрол выглядит так <span class="niceRadio"><input type="radio" name="[name radio]" id="[id radio]" [checked="checked"] /></span>
	новый контрол получает теже name, id и другие атрибуты что и были у обычного
*/
{

try
{
var el = el,
	radioName = el.attr("name"),
	radioId = el.attr("id"),
	radioChecked = el.attr("checked"),
	radioDisabled = el.attr("disabled"),
	radioTab = el.attr("tabindex"),
	radioValue = el.attr("value");
	if(radioChecked)
		el.after("<span class='niceRadio radioChecked'>"+
			"<input type='radio'"+
			"name='"+radioName+"'"+
			"id='"+radioId+"'"+
			"checked='"+radioChecked+"'"+
			"tabindex='"+radioTab+"'"+
			"value='"+radioValue+"' /></span>");
	else
		el.after("<span class='niceRadio'>"+
			"<input type='radio'"+
			"name='"+radioName+"'"+
			"id='"+radioId+"'"+
			"tabindex='"+radioTab+"'"+
			"value='"+radioValue+"' /></span>");
	
	/* если контрол disabled - добавляем соответсвующий класс для нужного вида и добавляем атрибут disabled для вложенного radio */		
	if(radioDisabled)
	{
		el.next().addClass("niceRadioDisabled");
		el.next().find("input").eq(0).attr("disabled","disabled");
	}
	
	/* цепляем обработчики стилизированным radio */		
	el.next().bind("mousedown", function(e) { changeRadio(jQuery(this)) });
	if(jQuery.browser.msie)	el.next().find("input").eq(0).bind("click", function(e) { changeVisualRadio(jQuery(this)) });	
	else el.next().find("input").eq(0).bind("change", function(e) { changeVisualRadio(jQuery(this)) });
	el.remove();
}
catch(e)
{
	// если ошибка, ничего не делаем
}

    return true;
}


function changeRadioStart2(el)
/* 
	новый контрол выглядит так <span class="niceRadio"><input type="radio" name="[name radio]" id="[id radio]" [checked="checked"] /></span>
	новый контрол получает теже name, id и другие атрибуты что и были у обычного
*/
{

try
{
var el = el,
	radioName = el.attr("name"),
	radioId = el.attr("id"),
	radioChecked = el.attr("checked"),
	radioDisabled = el.attr("disabled"),
	radioTab = el.attr("tabindex"),
	radioValue = el.attr("value");
	if(radioChecked)
		el.after("<span class='niceRadio2 radioChecked'>"+
			"<input type='radio'"+
			"name='"+radioName+"'"+
			"id='"+radioId+"'"+
			"checked='"+radioChecked+"'"+
			"tabindex='"+radioTab+"'"+
			"value='"+radioValue+"' /></span>");
	else
		el.after("<span class='niceRadio2'>"+
			"<input type='radio'"+
			"name='"+radioName+"'"+
			"id='"+radioId+"'"+
			"tabindex='"+radioTab+"'"+
			"value='"+radioValue+"' /></span>");
	
	/* если контрол disabled - добавляем соответсвующий класс для нужного вида и добавляем атрибут disabled для вложенного radio */		
	if(radioDisabled)
	{
		el.next().addClass("niceRadioDisabled");
		el.next().find("input").eq(0).attr("disabled","disabled");
	}
	
	/* цепляем обработчики стилизированным radio */		
	el.next().bind("mousedown", function(e) { changeRadio2(jQuery(this)) });
	if(jQuery.browser.msie)	el.next().find("input").eq(0).bind("click", function(e) { changeVisualRadio2(jQuery(this)) });	
	else el.next().find("input").eq(0).bind("change", function(e) { changeVisualRadio2(jQuery(this)) });
	el.remove();
}
catch(e)
{
	// если ошибка, ничего не делаем
}

    return true;
}


