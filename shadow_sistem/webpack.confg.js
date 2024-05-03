const path = require('path');

module.exports = {
  entry: './src/index.js', // Arquivo de entrada do seu aplicativo
  output: {
    path: path.resolve(__dirname, 'dist'), // Diretório de saída onde o bundle será gerado
    filename: 'bundle.js' // Nome do arquivo de saída
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Use regex para especificar quais arquivos devem ser processados pelo loader
        exclude: /node_modules/, // Não processar arquivos dentro de node_modules
        use: {
          loader: 'babel-loader', // Usar babel-loader para transpilar arquivos JavaScript
          options: {
            presets: ['@babel/preset-env'] // Usar preset env do Babel para transpilar para versões suportadas do ECMAScript
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: './dist', // Diretório base para o servidor de desenvolvimento
    port: 8080 // Porta do servidor de desenvolvimento
  }
};
 