window.onload = function(){	

    var aMoney = getClass('coins')[0].getElementsByTagName('input'), 
        oCoinsIn = getClass('coins-in')[0],           //显示出的投币数量及购买后的剩余
        oShowcase = getClass('exhibition-goods')[0],   //可购买商品展示区
        oCommodity = getClass('commodity'),   
        oOut = getClass('out')[0],
        flag = false,      //true表示没有投币和购买操作
        sumMoney = 0,     //投币数量显示
        timer = null,
        oOutbtn = oOut.getElementsByTagName('input')[0],    //退币按钮
        oOutshow = oOut.getElementsByTagName('input')[1],    //退币口
        showTime = getClass('show-time')[0];    //倒计时

        //投币
        function insert(){
        	for(var i = 0; i<aMoney.length; i++){
	            aMoney[i].onclick = function(){
                    flag = true;                //表示有购买或者投币的操作
                    clearInterval(timer);         //清除计时器
                    oCoinsIn.innerHTML = Number(oCoinsIn.innerHTML) + Number(this.value);
                    oOutshow.value = '';
		            getPrice();    //获取商品价格判断是否能购买
                    fallTime();      //开启计时器           
		        }
	        }
	        buy();          //购买
        };
        //获取商品价格判断是否能购买
        function getPrice(){
        	for(var i = 0; i<oCommodity.length; i++){
	        	var oPrice = Number(oCommodity[i].getElementsByTagName('p')[0].innerHTML);
                var aImg = oCommodity[i].getElementsByTagName('input')[0];
	        	if(oPrice <= oCoinsIn.innerHTML){  //判断商品价格是否小于投币面值
	        		aImg.style.color = "#fa0505"; //商品显示为可以购买
	        	}
                else{
                    aImg.style.color = "#d1cccc";     
                }
	        }
        };
 
        //购买
        function buy(){
        	for(var i = 0; i<oCommodity.length; i++){
        		oCommodity[i].onclick = function(){
                    flag = true;      //表示有购买或者投币的操作
                    clearInterval(timer);         //清除计时器
        			var price = Number(this.getElementsByTagName('p')[0].innerHTML);  //商品价格
        			if(oCoinsIn.innerHTML == ''){     //判断是否投币
        				alert("你傻啊！不给钱你买个啥啊！");
        			}
        			else{
                     	if(price > oCoinsIn.innerHTML){      //投币价格小于商品价格
                            alert("穷逼，滚蛋！");
	        			}else{

	                        oCoinsIn.innerHTML = oCoinsIn.innerHTML - price;    //选择商品后剩余的钱
	                        var imgSrc = this.getElementsByTagName('img')[0].src,   //获取购买商品图片的url
	                            oImg = document.createElement('img');      //创建商品图片标签
	                        oImg.src = imgSrc;    
	                        oImg.style.width = '25%';
	                        oImg.style.height = '30%';
	                        oShowcase.appendChild(oImg);    //将商品放入已购买区域
                            getClass('show-box')[1].style.height='auto';        //将该区域的高设为自适应

                            getPrice();             //获取商品价格判断是否能购买      
	        			}
        			} 
                    fallTime();  //开启计时器
        		}
        	}
        	out();    //退币
        }

        //退币
        function out(){
            oOutbtn.onclick = function(){
            	oOutshow.value = oCoinsIn.innerHTML; 
                oCoinsIn.innerHTML = '0';     //清空剩余币
                oShowcase.innerHTML = '';    //清空已购买的商品
                getClass('show-box')[1].style.height='50px'; 
                getPrice();
                clearInterval(timer);       //清除计时器
                showTime.innerHTML = '20';      //将计时器内容设置为10s
            }
        }
        
        //计时器
        function fallTime(){
            if(flag){    //如果有购买或者投币的操作
                showTime.innerHTML = '20';    //将计时器内容设置为10s
                timer = setInterval(function(){
                    if(showTime.innerHTML > 0){   //剩余时间大于0
                        showTime.innerHTML = Number(showTime.innerHTML) - 1;
                    }
                    else{
                        flag = false;     //表示10秒没没有任何操作
                        clearInterval(timer);   //清除计时器
                        showTime.innerHTML = '20';     //将计时器内容设置为10s
                        setInterval(autoOut(),20000);   //立即执行退币
                    }
                },1000)
            }
        }

        //自动退币
        function autoOut(){
            oOutshow.value = oCoinsIn.innerHTML; 
            oCoinsIn.innerHTML = '0';
            oShowcase.innerHTML = '';
            getPrice();
        }

    insert();

	function getClass(claName,parent){
	    var oParent=parent?getId(parent):document,
	        oChild=oParent.getElementsByTagName('*'),
	        oClass=[];

	   for(var i=0;i<oChild.length;i++){
	     	if(oChild[i].className==claName){
	         oClass.push(oChild[i]);
	     	}
	   }
	   return oClass;
	}	

}