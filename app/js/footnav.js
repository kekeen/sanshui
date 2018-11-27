function changefootimg(obj,flag){
	var cls = obj.find("i").attr("class"),
			newcls;
	if(flag){
		newcls = cls.replace(cls,cls+"-y");
	}else{
		newcls = cls.replace("-y","");
	}
	obj.find('i').attr("class",newcls);
}
$(".footnav li").each(function(){
	var $this = $(this);
	if($this.hasClass("active")){
		changefootimg($this,true);
	}
	$this.hover(function(){
		changefootimg($this,true);
	},function(){
		changefootimg($this);
	});
});