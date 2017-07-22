# coding: utf-8
class HomeController < ApplicationController
  def index
  end

  def upload
    uploaded_file = params[:uploaded_file]
    result = `python #{Settings.predictor_path} #{uploaded_file.path}`
    case result
    when /result :1/
      render json: { result: "您的車已在停車格內，請繼續下一步。" }
    when /result :0/
      render json: { result: "很抱歉，您的車不在停車格內，請停妥後再次嘗試。" }
    else
      render json: { result: "系統辨識失敗。" }
    end
  end
end
