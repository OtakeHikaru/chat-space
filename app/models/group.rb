class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  validatas :name, presence: true
end
