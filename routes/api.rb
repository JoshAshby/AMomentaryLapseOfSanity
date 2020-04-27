class Api
  hash_branch "api" do |r|
    r.root do
      { current_version: 1 }
    end
  end
end
