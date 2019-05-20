class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  validates :image, presence: true, unless: :content?
  mount_uploader :image, ImageUploader
end
