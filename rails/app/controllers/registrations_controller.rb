# frozen_string_literal: true

class RegistrationsController < ApplicationController
  before_action :require_guest_user, only: %i[new create]

  def new
    render inertia: "auth/signup"
  end

  def create
    user = User.new(user_params)

    if user.save
      start_new_session_for(user)
      redirect_to root_path, notice: "Account created successfully.", status: :see_other
      return
    end

    redirect_to signup_path, inertia: { errors: inertia_model_errors(user) }, status: :see_other
  end

  private

  def user_params
    params.permit(:email, :password, :password_confirmation)
  end
end
