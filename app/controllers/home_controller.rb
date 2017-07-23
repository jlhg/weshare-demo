# coding: utf-8
class HomeController < ApplicationController
  def index
  end

  def upload
    uploaded_file = params[:uploaded_file]
    result = `curl #{Settings.predictor_url}?input=#{uploaded_file.path}`
    case result
    when /result :1/
      render json: { result: "您的車已在停車格內，請繼續下一步。" }
    when /result :0/
      render json: { result: "很抱歉，您的車不在停車格內，請停妥後再次嘗試。" }
    else
      Rails.logger.debug result
      render json: { result: "影像辨識失敗。" }
    end
  end
end
