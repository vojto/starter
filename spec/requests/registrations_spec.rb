# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Registrations", type: :request do
  it "creates account and logs the user in" do
    expect do
      post signup_path, params: {
        email: "new-user@example.com",
        password: "password123",
        password_confirmation: "password123"
      }
    end.to change(User, :count).by(1)

    expect(response).to redirect_to(root_path)

    get signup_path
    expect(response).to redirect_to(root_path)
  end

  it "redirects back when account creation fails" do
    expect do
      post signup_path, params: {
        email: "",
        password: "password123",
        password_confirmation: "different-password"
      }
    end.not_to change(User, :count)

    expect(response).to redirect_to(signup_path)

    get signup_path
    expect(response).to have_http_status(:ok)
  end
end
