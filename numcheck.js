
/*
The lenght of the string is at least 8 characters with '-' chars
1st part has 2 or 3 number
the second part has at least 7 numbers
1 pcs hyphen character (-)
09-1234556 is legal
040-22334455 is legal
1234556 is illegal
1-22334455 is illegal
10-22-334455 is illegal
*/



function endFunction(phonenumber)
{
  var retval = "";
  var phonenum = phonenumber
  var a = 0;
  var numcount = 0;
  var hyphencount = 0;
  var hyphenindex = 0;
  var notnum = 0;
 
  for(a=0;a<phonenum.length;a++)
  {
    if(phonenum[a] == '-'
    {
      hyphencount++;
      hyphenindex = a;
    }
    else if(isNumber(phonenum[a]))
    {
      numcount++;
    }
    else
    {
      notnum++;
    }
  }
  retval = notnum;
  return retval;
}





<!DOCTYPE html>
<html>
<head>
<script language="JavaScript"> 
<!--
function endFunction(tesnumber)
{
  var retval = "";
  let testnum = tesnumber
  var a = 0;
  var numcount = 0;
  var hyphencount = 0;
  var hyphenindex = 0;
  var notnum = 0;
 
  for(a=0;a<testnum.length;a++)
  {
    if(testnum[a] == '-'
    {
      hyphencount++;
      hyphenindex = a;
    }
    else if(isNumber(testnum[a]) == true)
    {
      numcount++;
    }
    else
    {
      notnum++;
    }
  }
  retval = notnum;
  return retval;
}

function startFunction()
{
var tststr = "050-3002111";
var result = endFunction(tststr);
document.getElementById("demo").innerHTML = result;
}


//-->
</script>

<style>
</style>

</head>
<body onload="startFunction();">
<h1>Test Page</h1>
<p id="demo"></p>
</body>
</html>