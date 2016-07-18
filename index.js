$(function(){
	var kongbai={};               /*<<<<<<<<<<声明一个空表<<<<<<<<<<<<*/
	for (var i = 0; i <15; i++) {
		    $('<b>')
		    .addClass('hang')
		    .appendTo('.zhuozi')
		    $('<i>')
			.addClass('shu')
			.appendTo('.zhuozi')
		for (var j = 0; j < 15; j++) {
			kongbai[i+'-'+j]={x:i,y:j};
			$('<div>')
			.addClass('qizi')
			.attr('id',i+'-'+j)
			.data('pos',{x:i,y:j})
			.appendTo('.zhuozi')
		};
	};
	var join=function(n1,n2){
			return n1+'-'+n2;
		}		
	var panduan=function(pos,biao){
         
            var h=1,s=1,zx=1,yx=1;  //声明四个变量横 竖 左斜 右斜  方向上分别有一颗棋子
            var tx,ty;   //声明两个变量  表示原点
            tx=pos.x;    //给每个点赋值
            ty=pos.y;
            // 横 方向
            while(biao[join(tx,ty-1)]){
            	h++;ty--;
            }
            tx=pos.x;ty=pos.y;
            while(biao[join(tx,ty+1)]){
            	h++;ty++;
            }
            // 竖 方向
            tx=pos.x;ty=pos.y;
            while(biao[join(tx-1,ty)]){
            	s++;tx--;
            }
            tx=pos.x;ty=pos.y;
            while(biao[join(tx+1,ty)]){
            	s++;tx++;
            }
            // 左斜 方向
            tx=pos.x;ty=pos.y;
            while(biao[join(tx-1,ty+1)]){
            	zx++;tx--;ty++;
            }
            tx=pos.x;ty=pos.y;
            while(biao[join(tx+1,ty-1)]){
            	zx++;tx++;ty--;
            }
            // 右斜 方向
            tx=pos.x;ty=pos.y;
            while(biao[join(tx-1,ty-1)]){
            	yx++;tx--;ty--;
            }
            tx=pos.x;ty=pos.y;
            while(biao[join(tx+1,ty+1)]){
            	yx++;tx++;ty++;
            }
            return Math.max(h,s,zx,yx)
		}
		var kaiguan=true;
	    var hei={};
	    var bai={};
        
        $('.button .renji').on('click',function(e){
               e.stopPropagation();
               $(this).css({color:'red'})
               return isAi=true;
               $('.button .renren').off('click');
        })
        $('.button .renren').on('click',function(e){
               e.stopPropagation();
               $(this).css({color:'red'})
               return isAi=false;
               $('.button .renji').off('click');
        })
	    var isAi=false;
	    var ai=function(){          /*---ai人工智能的简写------声明一个ai函数为了方便人机对战--*/
	    	var zuobiao;                      /*<<<<<<<<<<<<<<<<<<<<<*/
	    	var max=-Infinity;
	    	for(var i in kongbai){
	    		var weixie=panduan(kongbai[i],hei);
	    		if (weixie>max) {
	    			max=weixie;
	    			zuobiao=kongbai[i];
	    		};
	    	}
	    	var zuobiao2                       /*<<<<<<<<<<<<<<<<<<<<<<*/
	    	var max2=-Infinity;
	    	for (var i in kongbai) {
	    		var weixie=panduan(kongbai[i],bai);
	    		if (weixie>max2) {
	    			max2=weixie;
	    			zuobiao2=kongbai[i];
	    		};
	    		
	    	};
	    	return  (max>max2)?zuobiao:zuobiao2;
	    }		
	var kaishi= $('.zhuozi .qizi').on('click',function(){
       
         var audio=$(".audio")[0];

            $('.button .renren').off('click');
            $('.button .renji').off('click');

		if ( $(this).hasClass('hei')||$(this).hasClass('bai')){
			return;
		}
		
	var pos=$(this).data('pos');

        if (kaiguan) {
        	$(this).addClass('hei')
        	hei[pos.x+'-'+pos.y]=true;
            audio.play()

        	delete kongbai[join(pos.x,pos.y)]            /*---------------*/

        	if (panduan(pos,hei)>=5) {
        		$('.tishi')
                .addClass('animation')
                .html('黑棋赢');
                audio.src='5808.mp3';
                audio.play();
        		$('.zhuozi .qizi').off('click');
        	};
        	if (isAi) {                                      /*----------------*/     
        		var pos=ai();
        		$('#'+join(pos.x,pos.y))
        		.addClass('bai');
        		bai[join(pos.x,pos.y)]=true;
                audio.play()
        		delete kongbai[join(pos.x,pos.y)];
        		if (panduan(pos,bai)>=5) {  
                    $('.tishi')
                    .addClass('animation')
                    .html('白棋赢');
                    audio.src='5808.mp3';
                    audio.play();
        		    $('.zhuozi .qizi').off('click')
        		};
        		return;
        	};
        	
        } else{
        	$(this).addClass('bai')
        	bai[pos.x+'-'+pos.y]=true;
            audio.play()
        	if (panduan(pos,bai)>=5) {
                $('.tishi').html('白棋赢')
                .addClass('animation')
                audio.src='5808.mp3';
                audio.play();
        		$('.zhuozi .qizi').off('click')
        	};
            
        };
        kaiguan=!kaiguan;
	})
    
    $('.button .again').on('click',function(e){
        e.stopPropagation();
        history.go(0)
    })
    $('.button .exit').on('click',function(e){
        e.stopPropagation();
        window.close();
    })

    $('.begin').on('click',function(){
        $('.changjing').css({display:'none'})
        $('.zhuozi').addClass('animation')
        $('.button').addClass('animation')
    })


})

