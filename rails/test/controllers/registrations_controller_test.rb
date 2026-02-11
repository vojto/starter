require "test_helper"

class RegistrationsControllerTest < ActionDispatch::IntegrationTest
  test "creates account and logs the user in" do
    post signup_url, params: {
      email: "new-user@example.com",
      password: "password123",
      password_confirmation: "password123"
    }

    assert_redirected_to root_url
    assert_equal "new-user@example.com", User.find(session[:user_id]).email
  end

  test "redirects back with errors when account creation fails" do
    assert_no_difference("User.count") do
      post signup_url, params: {
        email: "",
        password: "password123",
        password_confirmation: "different-password"
      }
    end

    assert_redirected_to signup_url
    assert_nil session[:user_id]
  end
end
