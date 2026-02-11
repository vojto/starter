# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Sessions", type: :request do
  let!(:user) do
    User.create!(
      email: "user@example.com",
      password: "password123",
      password_confirmation: "password123"
    )
  end

  it "logs in with valid credentials" do
    post login_path, params: { email: user.email, password: "password123" }

    expect(response).to redirect_to(root_path)

    get login_path
    expect(response).to redirect_to(root_path)
  end

  it "rejects invalid credentials" do
    post login_path, params: { email: user.email, password: "wrong-password" }

    expect(response).to redirect_to(login_path)

    get login_path
    expect(response).to have_http_status(:ok)
  end

  it "logs out and clears the session" do
    post login_path, params: { email: user.email, password: "password123" }
    expect(response).to redirect_to(root_path)

    delete logout_path
    expect(response).to redirect_to(root_path)

    get login_path
    expect(response).to have_http_status(:ok)
  end
end
