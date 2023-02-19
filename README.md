# TURBO3000_Digital-Assistant

## Web Assistent guide
1. Установить расширение GreaseMonkey (TamperMonkey) в браузере
2. Авторизоваться на сайте grants.myrosmol.ru
3. Запустись скрипт xenofan.user.js через расширение GreaseMonkey
4. Наслаждаться умным помощником по заполнению заявки

## Telegram bot guide
Библиотеки:
```
pip install -U --pre aiogram
```
1. Запустить скрипт
2. Перейти на сайт ```https://t.me/Xenophanes_talks_bot```
3. Написать ```\start``` либо нажать на соответствующую кнопку

### Inserter.py гайд
Библиотеки:
```
pip install psycopg2

```
СУБД:
PostgreSQL

Скрипт подключается к бд с названием grants.myrosmol, в таблицу requests заносит данные: id_Users (id пользователя), user_name (имя пользователя), request (текст запроса).

***Чтобы скрипт заработал нужно заменить на 14 строчке "1234" на пароль пользователя в PostgreSQL, также на 17 строчке вместо ``` import() ``` должны быть данные, полученные из запроса***

Скрипт SQL для создания таблицы:
```
CREATE TABLE requests
(
	Id SERIAL PRIMARY KEY,
	id_Users INTEGER,
	user_name CHARACTER VARYING(30),
	request CHARACTER VARYING(100)
);
INSERT INTO requests (id_Users, user_name, request) values
(348, 'Дима', 'Как подать грант');
```
