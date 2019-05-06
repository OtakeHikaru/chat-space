# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null: false, foreign_key: false|
|image|string|null: false, foreign_key: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, foreign_key: false|
|mail_address|string|null: false, foreign_key: false|
|rogin_pass|string|null: false, foreign_key: false|
### Association
- has_many :messages
- has_many :groups, through: :groups_users
- has_many :groups_users


## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|text|null: false, foreign_key: false|
|user_id|integer|null: false, foreign_key: true|
### Association
- has_many :messages
- has_many :users, through: :groups_users
- has_many :groups_users

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

