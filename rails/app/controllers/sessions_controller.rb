# frozen_string_literal: true

class SessionsController < ApplicationController
  before_action :require_guest_user, only: %i[new create]
  before_action :require_authenticated_user, only: :destroy

  def new
    render inertia: "auth/login"
  end

  def create
    user = User.find_by(email: params[:email].to_s.strip.downcase)

    if user&.authenticate(params[:password])
      start_new_session_for(user)
      redirect_to root_path, notice: "Logged in successfully.", status: :see_other
      return
    end

    redirect_to login_path,
      alert: "Invalid email or password.",
      inertia: { errors: { email: "Invalid email or password" } },
      status: :see_other
  end

  def destroy
    reset_session
    redirect_to root_path, notice: "Logged out successfully.", status: :see_other
  end
end
