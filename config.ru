require 'sinatra/base'

class Controller < Sinatra::Base

  configure do
    set :views, './views'
    set :public_folder, './public'
  end

  get '/' do
    erb :index, locales: {scripts: scripts}
  end

  def scripts
    Dir["./lib/*.js"]
  end
end

map('/') { run Controller.new }