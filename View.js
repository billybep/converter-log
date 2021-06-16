class View {

  static noInput = _ => {
    console.log('Please type "mytools -h" to show all commands');
  }

  static commandHelp = _ => {
    console.log(`
      ==============================================================================================
      =                         HELP COMMAND                                                       =
      ==============================================================================================
      =         Commands                                          description                      =
      ==============================================================================================   
          mytools -h                                            show help commands
          mytools <filename> -t json                            konversi file to JSON           
          mytools <filename> -t text                            konversi file to Plaintext
          mytools <filename> -t <flag> -o <output directory>    konversi file and set output file
      ==============================================================================================
      
      -> Example : node app.js mytools /var/log/error.log -t json
      -> this command will convert file "error.log" to error.json
    `)
  }
}

module.exports = View