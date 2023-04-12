# Meeting 7

განსახილველი თემები:

* [How does the Internet work?](#how-does-the-internet-work)
* [How the Web works?](#how-the-web-works)
* [Difference between webpage, website, web server, and search engine](#რა-განსხვავებაა-webpage-website-web-server-და-search-engine-შორის)
* [What is a web server?](#what-is-a-web-server)
* Introducing Node
  * Your first running web server


## How does the Internet work?

The **Internet** is the backbone of the Web, the technical infrastructure that makes the Web possible. At its most basic, the Internet is a large network of computers which communicate all together.


### A simple network

When two computers need to communicate, you have to link them, either physically (usually with an [Ethernet cable](https://en.wikipedia.org/wiki/Ethernet_crossover_cable)) or wirelessly (for example with [WiFi](https://en.wikipedia.org/wiki/WiFi) or [Bluetooth](https://en.wikipedia.org/wiki/Bluetooth) systems). All modern computers can sustain any of those connections.

> **Note:**
>
> In this examples we will only talk about physical cables, but wireless networks work the same.

![simple-network](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work/internet-schema-1.png)

ასეთი ქსელი არ არის შეზღუდული მხოლოდ ორი კომპიუტერით. ჩვენ რათქმაუნდა შეგვიძლია დავაკავშიროთ იმდენი კომპიუტერი, რამდენიც გვსურ. თუმცა ის ძალიან სწრაფად რთულდება. მაგალითად, თუ ვცდით დავაკავშიროთ ათი კომპიუტერი, დაგვჭირდებათ 45 კაბელი, თითო კომპიუტერზე ცხრა შემაერთებლით!

![simple-network-2](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work/internet-schema-2.png)

ამ პრობლემის გადასაჭრელად, ქსელში არსებული თითოეული კომპიუტერი დაკავშირებულია სპეციალურ პატარა კომპიუტერთან, რომელსაც ეწოდება *router*.

ამ *როუტერს* აქვს მხოლოდ ერთი სამუშაო (რკინიგზის სადგურის სიგნალის მსგავსად):

**ის გვიდასტურებს, რომ მოცემული კომპიუტერიდან გაგზავნილი შეტყობინება მივიდა სწორი დანიშნულების კომპიუტერში.**

B კომპიუტერზე შეტყობინების გასაგზავნად, A კომპიუტერმა უნდა გაუგზავნოს შეტყობინება როუტერს, რომელიც თავის მხრივ გადასცემს შეტყობინებას B კომპიუტერს და დარწმუნდება, რომ შეტყობინება არ მიეწოდება C კომპიუტერს.

მას შემდეგ, რაც სისტემას როუტერს დავამატებთ, ჩვენი 10 კომპიუტერისგან შემდგარი ქსელი საჭიროებს მხოლოდ 10 კაბელს: ერთი გამომავალი კაბელი თითოეული კომპიუტერიდან და როუტერი 10 შემავალი კაბელით.

![simple-network-3](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work/internet-schema-3.png)

### A network of networks

ჯერჯერობით ყველაფერი კარგადაა. მაგრამ რა მოხდება თუ შევეცდებით ასობით, ათასობით, მილიარდობით კომპიუტერის დაკავშირებას? რა თქმა უნდა, ერთი *როუტერი* ვერ მასშტაბირებს ასე შორს, მაგრამ, თუ ყურადღებით წაიკითხავთ, ჩვენ ვთქვით, რომ *როუტერი* არის კომპიუტერი, როგორც ყველა სხვა, ასე რომ, რა გვიშლის ხელს ორი *როუტერის* ერთმანეთთან დაკავშირებაში? არც არაფერი, ჰოდა ასეც მოვიქცეთ.

![network-of-networks](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work/internet-schema-4.png)

კომპიუტერების როუთერთან(მარშრუტიზატორებთან) დაკავშირებით და შემდეგ როუტერების სხვა როუტერებთან დაკავშირებით, ჩვენ შეგვიძლია ქსელის უსასრულოდ მასშტაბირება.

![network-of-networks-2](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work/internet-schema-5.png)

ასეთი ქსელი ძალიან უახლოვდება იმას, რასაც ჩვენ ინტერნეტს ვუწოდებთ, მაგრამ რაღაც გვაკლია. ჩვენ შევქმენით ეს ქსელი ჩვენი საკუთარი მიზნებისთვის. თუმცა შესაძლოა არსებობდეს ასევე სხვა ქსელები: თქვენს მეგობრებს, მეზობლებს, ნებისმიერს შეუძლია ჰქონდეს კომპიუტერების საკუთარი ქსელი. მაგრამ ნამდვილად შეუძლებელია კაბელის გაბმა თქვენს სახლსა და დანარჩენ სამყაროს შორის, ასე რომ, როგორ მოვაგვაროთ ეს პრობლემა?

ნუ, თუ დავფიქრდებით ჩვენ სახლებში უკვე არსებობს კაბელები, მაგალითად, ელექტროენერგიისა და ტელეფონისთვის. სატელეფონო ინფრასტრუქტურა უკვე აკავშირებს თქვენს სახლს მსოფლიოს ნებისმიერ ადამიანთან, ასე რომ, ეს არის იდეალური კაბელი, რომელიც ჩვენ გამოგვადგება.

ჩვენი ქსელის სატელეფონო ინფრასტრუქტურასთან დასაკავშირებლად, ჩვენ გვჭირდება სპეციალური მოწყობილობა, რომელსაც ეწოდება *modem*. ეს *მოდემი* აქცევს ინფორმაციას ჩვენი ქსელიდან სატელეფონო ინფრასტრუქტურის მიერ მართვად/გასაგებ ინფორმაციად და პირიქით.

![modem](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work/internet-schema-6.png)

მისი დახმარებით, ჩვენ უკვე ვართ დაკავშირებული სატელეფონო ინფრასტრუქტურასთან. შემდეგი ნაბიჯი არის შეტყობინებების გაგზავნა ჩვენი ქსელიდან ნებისმიერ სხვა ქსელთან, რომელსაც გვინდა დავუკავშირდეთ.

ამისათვის ჩვენ ჩვენს ქსელს დავუკავშირებთ Internet Service Provider (ISP). ინტერნეტ სერვის პროვაიდერი არის კომპანია, რომელიც მართავს სპეციალურ *როუტერებს*, რომლებიც ერთმანეთთან არის დაკავშირებული და ასევე შეუძლია წვდომა სხვა პროვაიდერების როუტერებზე.

ასე რომ, შეტყობინება ჩვენი ქსელიდან გადადის პროვაიდერი კომპანიის ქსელების გავლით დანიშნულების ქსელში.

<b>"ინტერნეტი"</b> გულისხმობს ამ ქსელების მთელ ინფრასტრუქტურას.

<img src="https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work/internet-schema-7.png" height="800px" />


### Finding computers

თუ გსურთ გაგზავნოთ შეტყობინება კომპიუტერზე, უნდა მიუთითოთ რომელ კომპიუტერზე გსურთ კონკრეტულად. მსგავსად, ქსელთან დაკავშირებულ ნებისმიერ კომპიუტერს აქვს უნიკალური მისამართი, რომელიც განსაზღვრავს მის უნიკალურობას, მას ეწოდება "IP მისამართი" (სადაც IP ნიშნავს *ინტერნეტ პროტოკოლს*). ეს არის მისამართი, რომელიც შედგება წერტილებით გამოყოფილი ოთხი რიცხვისგან, მაგალითად: `192.168.2.10`.

ეს სავსებით საკმარისია კომპიუტერებისთვის, მაგრამ ჩვენ ადამიანებს გვიჭირს ასეთი მისამართის დამახსოვრება. საქმეების გასაადვილებლად, ჩვენ შეგვიძლია ზედმეტსახელები დავარქვათ IP მისამართებს რათა ადამიანისთვის უფრო მარტივი წასაკითხი გახდეს, ამას ეწოდება **დომენის სახელი**(domain name). მაგალითად (IP მისამართები შეიძლება შეიცვალოს) `google.com` არის დომენის სახელი, რომელიც გამოიყენება შემდეგი IP მისამართის მისანიშნებლად `173.194.121.32`. თუმცა თუ აიპი შეიცვლება ჩვენ ეს არ გვადარდებს, რადგან იგივე დომენი უკვე ახხალ მისამართს მიანიშნებს ნაცვალდ ძველისა. ასე რომ, დომენის სახელის გამოყენება ჩვენთვის ყველაზე მარტივი გზაა დავამყაროთ კავშირი ქსელში არსებულ კომპიუტერებთან ინტერნეტის მეშვეობით.

![google-ip-dn](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work/dns-ip.png)


### Internet and the web

როგორც თქვენ შეამჩნევთ, როდესაც ვებ ბრაუზერში ვართ, ჩვენ ვიყენებთ დომენის სახელს ვებსაიტთან დასაკავშირებლად. ნიშნავს თუ არა ეს, რომ Internet და Web ერთი და იგივე რამაა? პასხუი არც ისე მარტივია.

როგორც ვნახეთ, Internet არის ტექნიკური ინფრასტრუქტურა, რომელიც საშუალებას აძლევს მილიარდობით კომპიუტერს ერთმანეთს დაუკავშირდნენ. ამ დაკავშირებულ კომპიუტერებს შორის, არსებობს ზოგიერთი კომპიუტერი რომელსაც (ე.წ. *ვებ სერვერებს*) შეუძლია ვებ-ბრაუზერებისთვის გასაგები შეტყობინებების გაგზავნა.

რომ შევაჯამოთ, **Internet** არის **ინფრასტრუქტურა**, ხოლო **Web** არის ამ ინფრასტრუქტურაზე დაშენებული **სერვისი**.

## How the Web works

გააზრება თუ *როგორ მუშაობს ვები* გვეხმარება უფრო მარტივად დავინახოთ რა ხდება, როდესაც უყურებთ ვებგვერდს ბრაუზერში (კომპიუტერში ან ტელეფონში).

ინტერნეტთან დაკავშირებულ კომპიუტერებს ეწოდება **კლიენტები** და **სერვერები**. მათი ურთიერთქმედების გამარტივებული დიაგრამა შეიძლება ასე გამოიყურებოდეს:

![client-to-server](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works/simple-client-server.png)

* კლიენტებს წარმოადგენენ მომხმარებლის ინტერნეტთან დაკავშირებული ნებისმიერი მოწყობილობები (მაგალითად, თქვენი კომპიუტერი დაკავშირებული თქვენს Wi-Fi-სთან, ან თქვენი ტელეფონი დაკავშირებულია თქვენს მობილურ ქსელთან) და ასევე ვებ-წვდომის პროგრამული უზრუნველყოფები, რომლებიც ხელმისაწვდომია ამ მოწყობილობებზე (იგულისხმება, ვებ ბრაუზერი, როგორიცაა Firefox, Chrome ან სხვა).
* სერვერები არიან კომპიუტერები, რომლებიც ინახავენ ვებგვერდებს, საიტებს ან აპლიკაციებს. როდესაც კლიენტ მოწყობილობას სურს წვდომა ვებ გვერდზე, ვებგვერდის ასლი ჩამოიტვირთება სერვერიდან კლიენტის მოწყობილობაზე, რათა გამოისახოს/დაიხატოს შედეგი მომხმარებლის ვებ ბრაუზერში.

> **Note:**
>
> It's highly recomended to learn this topic deeply. [(one good resource)](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works)


## რა განსხვავებაა webpage, website, web server, და search engine შორის?

ძალიან ადვილია ამ ტერმინების ერთმანეთში არევა, რადგან ისინი ერთმანეთთან მჭიდროდ არიან დაკავშირებული, მაგრამ წარმოადგენენ განსხვავებულ ფუნქციებს.

#### web page

**დოკუმენტი**, რომელიც შეიძლება იყოს ნაჩვენები ვებ ბრაუზერში (როგორიცაა Firefox, Google Chrome და ა.შ.). მათ ასევე ხშირად უწოდებენ უბრალოდ "გვერდებს".

#### website

**ვებ გვერდების ერთობლიობა**, რომლებიც დაჯგუფებულია და ჩვეულებრივ დაკავშირებულია ერთმანეთთან სხვადასხვა გზით. ხშირად უწოდებენ "ვებ-საიტს" ან მხოლოდ "საიტს".

#### web server

**კომპიუტერი**, რომელიც მასპინძლობს(hosts/ჰოსტავს) ვებსაიტს ინტერნეტში.

#### search engine

ვებ **სერვისი**, რომელიც დაგეხმარებათ იპოვოთ სხვა ვებ გვერდები, როგორიცაა Google, Bing, Yahoo ან DuckDuckGo. საძიებო სისტემებზე წვდომა ჩვეულებრივ ხდება ვებ ბრაუზერის საშუალებით.


## What is a web server?

სანამ დავიწყებთ ვებ სერვერზე საუბარს, მოდი შევხედოთ მარტივ ანალოგიას საჯარო ბიბლიოთეკის მაგალითზე.

ეს არის ის, რასაც ჩვეულებისამებრ გააკეთებდით ბიბლიოთეკაში მისვლისას:

1. წიგნების სიის კატალოგში მოძებნით თქვენთვის სასურველი წიგნის სათაურს და ინდექსს(ნომერს).
2. ჩაინიშნავთ წიგნის კატალოგის ნომერი.
3. მიხვალთ წიგნების შემცველ კონკრეტულ განყოფილებაში, იპოვით კატალოგის სწორ ნომერს და მიიღებთ წიგნი.

მოდით შევადაროთ ბიბლიოთეკა ვებ სერვერს:

* ბიბლიოთეკა ვებ სერვერს ჰგავს. მას აქვს რამდენიმე განყოფილება, რომელიც ჰგავს ვებ სერვერს, რომელიც მასპინძლობს(hosts) მრავალ ვებსაიტს.
* ბიბლიოთეკაში არსებული სხვადასხვა განყოფილებები (მეცნიერება, მათემატიკა, ისტორია და ა.შ.) ვებსაიტების მსგავსია. თითოეული სექცია გავს უნიკალური ვებსაიტს (ანუ, ორი ან რამდენიმე სექცია არ შეიცავს ერთსა და იმავე წიგნებს).
* წიგნები თითოეული განყოფილება ჰგავს ვებგვერდებს. ერთ ვებსაიტს შეიძლება ჰქონდეს რამდენიმე ვებგვერდი, მაგალითად, მეცნიერების განყოფილებას (საიტს) ექნება წიგნები სითბოს, ხმის, თერმოდინამიკის, სტატიკის და ა.შ. (ვებგვერდები). თითოეული ვებგვერდის ნახვა შესაძლებელია უნიკალურ ადგილას (URL).
* საძიებო ინდექსი საძიებო სისტემას ჰგავს. თითოეულ წიგნს აქვს თავისი უნიკალური ადგილმდებარეობა ბიბლიოთეკაში (ორი წიგნის შენახვა არ შეიძლება ერთსა და იმავე ადგილას), რომელიც მითითებულია კატალოგის ნომრით.

ტერმინი *ვებ სერვერი* შეიძლება ეხებოდეს როგორც hardware ასევე software მხარეს, ან ორივე ერთად მომუშავეს.

1. ფიზიკური(hardware) მხრივ, ვებ სერვერი არის **კომპიუტერი**, რომელიც ინახავს ვებ სერვერის პროგრამულ უზრუნველყოფას და ვებსაიტის კომპონენტ ფაილებს.

მაგალითად, HTML დოკუმენტებს, სურათებს, CSS სტილებს და JavaScript ფაილებს. ვებ სერვერი უერთდება ინტერნეტს და იძლევა ფიზიკური მონაცემების გაცვლის საშუალებას ინტერნეტთან დაკავშირებულ სხვა მოწყობილობებთან.

2. პროგრამული უზრუნველყოფის(software) მხრივ, ვებ სერვერი მოიცავს რამდენიმე ნაწილს, რომლებიც **აკონტროლებენ როგორ წვდებიან ვებ მომხმარებლები დაჰოსტილ ფაილებს**.

როგორც მინიმუმ, ეს არის *HTTP სერვერი*. HTTP სერვერი არის პროგრამული უზრუნველყოფა, რომელსაც ესმის [URLs](https://developer.mozilla.org/en-US/docs/Glossary/URL) (ვებ მისამართები) და [HTTP](https://developer.mozilla.org/en-US/docs/Glossary/HTTP) (პროტოკოლი, რომელსაც თქვენი ბრაუზერი იყენებს ვებგვერდების სანახავად).

HTTP სერვერზე წვდომა შესაძლებელია მის მიერ შენახული ვებსაიტების დომენური სახელებით და ის ამ ჰოსტირებული ვებსაიტების შემცველობას/კონტენტს აწვდის მომთხოვნი მომხმარებლის მოწყობილობას.

ყველაზე მარტივ მაგალითზე რომ ვთქვათ, როდესაც ბრაუზერს სჭირდება ფაილი, რომელიც განთავსებულია ვებ სერვერზე, ბრაუზერი ითხოვს ფაილს HTTP-ის საშუალებით.

როდესაც მოთხოვნა მიაღწევს სწორ (hardware) ვებ სერვერს, (software) *HTTP სერვერი* იღებს მოთხოვნას, პოულობს მოთხოვნილ დოკუმენტს და აგზავნის მას ბრაუზერში, ასევე HTTP-ის საშუალებით. (თუ სერვერი ვერ პოულობს მოთხოვნილ დოკუმენტს, ის აბრუნებს [404](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404) კოდის მქონე პასუხს.)

![web-server-to-browser](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_web_server/web-server.svg)

ვებსაიტის გამოსაქვეყნებლად(publish/deploy) გჭირდებათ სტატიკური ან დინამიური ვებ სერვერი.

**სტატიკური ვებ სერვერი**, შედგება კომპიუტერისა (hardware) და HTTP სერვერის (software) ერთობლიობისგან. ჩვენ მას "სტატიკურს" ვუწოდებთ, რადგან სერვერი აგზავნის თავის დაჰოსტილ ფაილებს ჩვენს ბრაუზერში უცვლელად.

**დინამიური ვებ სერვერი** შედგება სტატიკური ვებ სერვერისგან და დამატებითი პროგრამული უზრუნველყოფისგან(software), როგორც წესი *აპლიკაციის სერვერისა* და *მონაცემთა ბაზისგან*. ჩვენ მას "დინამიურს" ვუწოდებთ, რადგან აპლიკაციის სერვერი განაახლებს დაჰოსტილ ფაილებს HTTP სერვერის მეშვეობით თქვენს ბრაუზერში კონტენტის/შიგთავსის გამოგზავნამდე.

მაგალითად, ბრაუზერში საჩვენებელი საბოლოო ვებგვერდების შექმნამდე, აპლიკაციის სერვერმა შეიძლება შეავსოს/შეცვალოს HTML შაბლონი მონაცემთა ბაზის ინფორმაციით.

საიტებს, როგორებიცაა MDN ან Wikipedia აქვთ ათასობით ვებგვერდი. როგორც წესი, ამ ტიპის საიტები შედგება მხოლოდ რამდენიმე HTML შაბლონისგან და გიგანტური მონაცემთა ბაზისგან, და არა ათასობით სტატიკური HTML დოკუმენტისგან. ეს კონფიგურაცია აადვილებს კონტენტზე მუშაობას და მომხმარებლამდე მიტანას.

#### **ძალიან რეკომენდებულია კითხვა განაგრძოთ**: [Web Server - Deeper dive](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_web_server#deeper_dive)


## Introducing Node

[Node](https://nodejs.org/) (or more formally *Node.js*) is an open-source, cross-platform runtime environment that allows developers to create all kinds of server-side tools and applications in JavaScript. The runtime is intended for use outside of a browser context (i.e. running directly on a computer or server OS).


From a web server development perspective Node has a number of benefits:

* Great performance! Node was designed to optimize throughput and scalability in web applications and is a good solution for many common web-development problems (e.g. real-time web applications).
* Code is written in "plain old JavaScript", which means that less time is spent dealing with "context shift" between languages when you're writing both client-side and server-side code.
* JavaScript is a relatively new programming language and benefits from improvements in language design when compared to other traditional web-server languages (e.g. Python, PHP, etc.) Many other new and popular languages compile/convert into JavaScript so you can also use TypeScript, CoffeeScript, ClojureScript, Scala, LiveScript, etc.
* The node package manager (NPM) provides access to hundreds of thousands of reusable packages. It also has best-in-class dependency resolution and can also be used to automate most of the build toolchain.
* Node.js is portable. It is available on Microsoft Windows, macOS, Linux, Solaris, FreeBSD, OpenBSD, WebOS, and NonStop OS. Furthermore, it is well-supported by many web hosting providers, that often provide specific infrastructure and documentation for hosting Node sites.
* It has a very active third party ecosystem and developer community, with lots of people who are willing to help.

You can use Node.js to create a simple web server using the Node HTTP package.


> Note:
>
> [Download](https://nodejs.org/en/download/) and Install Node on your local machine before continue reading.


### Hello Node.js (Your first running web server)

The following example creates a web server that listens for any kind of HTTP request on the URL `http://127.0.0.1:8080/` — when a request is received, the script will respond with the string: "Hello World". If you have already installed node, you can follow these steps to try out the example:

1. Open Terminal (on Windows, open the command line utility)
2. Create the folder where you want to save the program, for example, `test-node` and then enter it by entering the following command into your terminal:
   ```bash
   cd test-node
   ```
3. Create a file called `hello.js` that contains
   ```js
   // Load HTTP module
   const http = require("http");

   const hostname = "127.0.0.1";
   const port = 8080;

   // Create HTTP server
   const server = http.createServer((req, res) => {

      // Set the response HTTP header with HTTP status and Content type
      res.writeHead(200, {'Content-Type': 'text/plain'});

      // Send the response body "Hello World"
      res.end('Hello World\n');
   });

   // Prints a log once the server starts listening
   server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
   })
   ```
4. Save the file in the folder you created above.
5. Go back to the terminal and type the following command:
   ```bash
   node hello.js
   ```

Finally, navigate to `http://localhost:8000` in your web browser; you should see the text "**Hello World**" in the upper left of an otherwise empty web page.


თუ გვინდა ჩვენს სერვერს დავუკავშირდეთ სხვა მოწყობილობიდან, რომელიც ამავე ქსელშია ჩართული, სიმარტივისთვის ამ ეტაპისთვის შევცვალოთ hostname ჩვენი მოწყობილობის ლოკალური IP მისამართით ამ ქსელში.

on Linux & Mac

```bash
ifconfig 
```

inet ის გასწვრივ ჩვენი ლოკალური მისამართი (იწყება 192.168./--/./--/).

on Windows

```bash
ipconfig
```

IPv4 Address.


გავუშვათ სერვერი თავიდან და შევამოწმოთ სხვა, ამ ქსელში ჩართული, მოწყობილობიდან წვდომა.


ტექსტის მაგივრად დავაბრუნოთ html დოკუმენტი.

```js
const http = require("http");
const fs = require("fs");
const port = 8080;

const server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  fs.readFile("./index.html", function (error, data) { // index.html must be in the same directory
    if (error) {
      res.writeHead(404);
      res.write("Error: File Not Found");
    } else {
      res.write(data);
    }
    res.end();
  });
});

server.listen(port, function (error) {
  if (error) console.log("Something went wrong", error);
  else console.log("Server is listening on port " + port);
});

```


### Web Frameworks

Other common web-development tasks are not directly supported by Node itself. If you want to add specific handling for different HTTP verbs (e.g. `GET`, `POST`, `DELETE`, etc.), separately handle requests at different URL paths ("routes"), serve static files, or use templates to dynamically create the response, Node won't be of much use on its own. You will either need to write the code yourself, or you can avoid reinventing the wheel and use a web framework! (e.i Express.Js)


## References

[How does the internet work :MDN](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_does_the_Internet_work)

[How the Web works :MDN](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works)

[What is the difference between webpage, website, web server, and search engine? :MDN](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Pages_sites_servers_and_search_engines)

[What is a web server? :MDN](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_web_server)

[Node introduction](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction#introducing_node)


## Recomendations

[Server-side website programming first steps :MDN](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps)

[Client-Server Overview :MDN](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Client-Server_overview)

[Node.js Tutorials :w3Schools](https://www.w3schools.com/nodejs/nodejs_get_started.asp)
