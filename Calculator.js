let str="";
let S=[];
let outPutStr="";
let numList1=["0","1","2","3","4","5","6","7","8","9"];
let postFix="";
let numList=['0','1','2','3','4','5','6','7','8','9'];
let flagForNan,flagForInfinity;
flagForInfinity=1;
flagForNan=1;

function reset(){

	document.getElementById("input").value="";
	str="";
	S=[];
	flagForInfinity=1;
	flagForNan=1;
	postFix="";
	outPutStr="";
	
}

function performOpration(id){
    
  str=document.getElementById("input").value;

	function priorityCheck(ch)
	{
		let priority_peek=0,priority_char=0;
		//setting priority of peek element
	
        let length=S.length;
	    if(S[length-1]=='/' || S[length-1]=='*')
		    priority_peek=1;
		else if(S[length-1]=='+' || S[length-1]=='-')
		    priority_peek=2;

		//setting priority of character 

		if(ch=='/' || ch=='*')
		    priority_char=1;
		else if(ch=='+' || ch=='-')
		    priority_char=2;

		if(priority_peek<=priority_char)
		   return false;
		else
		   return true;	    
	}


	function popAccordingToPriority(ch)
	{
		let ans;
		let ele;
		if(S.length==0)
		    S.push(ch);
		else
		{
            ans=priorityCheck(ch);
			if(ans==false)
			{
              ele=S.pop();
			  postFix=postFix+" "+ele+" ";
			  //console.log(postFix);
			  popAccordingToPriority(ch);
			}
			else
			  S.push(ch);
		}
	}


   function popAllEleFromStack()
   {
	while(S.length!==0)
	{

		postFix=postFix+" "+S.pop()+" ";
	}
   }

	for(let i=0;i<str.length;i++)
	{
		if(str.charAt(i)==='/' || str.charAt(i)==='*'|| str.charAt(i)==='-' || str.charAt(i)==='+')
		{
			postFix=postFix+" ";
			if(S.length==0)
			    S.push(str.charAt(i));
			else
			    popAccordingToPriority(str.charAt(i));   
		}

		else
			   postFix=postFix+str.charAt(i);
	}
    
	popAllEleFromStack();
	

let postFixstr=postFix.split(" ");
//console.log(postFixstr);
	function operation(S,op)
    {
       
        if(S.length!==0)
        {
           let operand2=S.pop();
           let operand1=S.pop();
           let result=0;
           switch(op)
           {
                case '+': 
                        result=operand1 + operand2;
                        break;
                case '-': 
                        result=operand1 - operand2;
                        break;
                case '*': 
                        result=operand1 * operand2;
                        break;
                case '/': 
                        if(operand2!=0)
                           result=operand1 / operand2;
						else if(operand1===0 && operand2===0)
						   {
							   flagForNan=-1;
							   
						   }
						else if(operand1!==0 && operand2===0)
						{
							flagForInfinity=-1;
						
						}
                        break;
                
           }
           S.push(result);

        }
    }

    function traversalString(S,postFix)
    {
        
        for(let i=0;i<postFixstr.length;i++)
        {
		  if(postFixstr[i]!=="")
          {
            let op=postFixstr[i].charAt(0);
            if(op=='+'|| op=='-'|| op=='/' || op=='*')
                   operation(S,op);
            else
            {
                S.push(Number(postFixstr[i]));
            }
          }

        }
        
    }
	
		
		traversalString(S,postFixstr);
		if(flagForNan==-1)
		 outPutStr="NaN";
		 // console.log("NaN")
		else if(flagForInfinity==-1)
		  outPutStr="Infinity";
		  //console.log("Infinity");
		else
		  outPutStr=S[S.length-1];
		  //console.log(S[S.length-1]);
document.getElementById("input").value="";
document.getElementById("input").value=outPutStr;
str=outPutStr;
flagForInfinity=1;
flagForNan=1;
postFix="";
//console.log(outPutStr);
                           //partial reseting 
outPutStr="";

 
}

function fun(id){
   
   let operand=document.getElementById(id).innerHTML;
   
   
       if(document.getElementById("input").value.length===0)
       {
         if(operand==="." || numList1.includes(operand))
        {
         if(operand===".")
           operand="0.";
           
         str=str+operand;
        
        }
         document.getElementById("input").value=str;
     }
     else 
     {
         if(str!=="")
         {
           str=str+operand;
           document.getElementById("input").value=str;
         }
     }
     
   //inputValue=operand;
}