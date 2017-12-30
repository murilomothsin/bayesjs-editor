module.exports = {
  "transform": {
    "^.+\\.jsx?$": "babel-jest",
  },
  setupFiles: ['./jest.setup.js'],
  "moduleNameMapper": {
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "identity-obj-proxy"
  }
}