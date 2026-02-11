class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  before_action :set_current_user

  inertia_share do
    {
      auth: {
        user: Current.user&.slice(:id, :email)
      }
    }
  end

  helper_method :current_user

  private

  def current_user
    Current.user
  end

  def require_authenticated_user
    return if current_user

    redirect_to login_path
  end

  def require_guest_user
    return unless current_user

    redirect_to root_path
  end

  def start_new_session_for(user)
    reset_session
    session[:user_id] = user.id
    Current.user = user
  end

  def inertia_model_errors(record)
    record.errors.to_hash.transform_values { |messages| Array(messages).first }
  end

  def set_current_user
    Current.user = User.find_by(id: session[:user_id]) if session[:user_id]
  end
end
