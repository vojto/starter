require "test_helper"

class SessionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = User.create!(
      email: "user@example.com",
      password: "password123",
      password_confirmation: "password123"
    )
  end

  test "logs in with valid credentials" do
    post login_url, params: { email: @user.email, password: "password123" }

    assert_redirected_to root_url
    assert_equal @user.id, session[:user_id]
  end

  test "rejects invalid credentials" do
    post login_url, params: { email: @user.email, password: "wrong-password" }

    assert_redirected_to login_url
    assert_nil session[:user_id]
  end

  test "logs out and clears session" do
    post login_url, params: { email: @user.email, password: "password123" }

    delete logout_url

    assert_redirected_to root_url
    assert_nil session[:user_id]
  end
end
