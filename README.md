<h1 align="center"> <img src = 'https://cdn.discordapp.com/attachments/772106096713924671/807975843548626944/anime-original-brown-hair-girl-green-eyes-hd-wallpaper-preview.png' height='50'> Kiwii</h1>

## Table of contents

- [Kiwiibot](#kiwiibot)
- [Installation](#install)
- [Usage](#usage)
- [Features](#features)
- [License](#license)

## Kiwiibot

> A SIMPle bot who's not very useful

## Install

```
You have to install NodeJS and Git.
Create a folder.
Open Command Promt.
Type in: cd The path to your new folder. (Example: C:\Users\User\Desktop\New folder)
Press enter.
After that type in: git clone https://github.com/Rapougnac/Kiwiibot.git
Press enter.
When you see all Github files in your folder you installed the bot succesfully.
Once you've done that move into the folder, and type [npm install]
Now you can run the bot by doing [node .]
```

Don't put the `[]` in the command prompt

## Usage

Open configexample.json
And change the following values:

```json
"discord":{
    "discord": {
      "token": "TOKEN_HERE(required)(https://discord.com/developers/applications)",
      "default_prefix": "PREFIX_HERE(required)",
      "status": "dnd",
      "dev": {
        "include_cmd": [],
        "exclude_cmd": [],
        "active": false /*Default is false, you can put it to true to exclude or include commands*/
      }
  },
  "amethyste": {
    "client": "AMETHYSTE_KEY_HERE(optional, but images manipulation won't work)(https://api.amethyste.moe/) get one here, sign up and copy and paste your token"
  },
    "chatbot": {
    "id": "ID_HERE(optionnal) but the chatbot functionnality won't work(https://brainshop.ai/user/register) get the id here",
    "key": "KEY_HERE(optionnal) but the chatbot functionnality won't work(https://brainshop.ai/user/register) get the key here"
  }
}
```
> :warning: Don't forget to change the name of the `configexample.json` to `config.json`!
## Features

- Interact with users trough gifs (For example: !hug @user)!
- OwOfy text!
- Get random questions, facts and cat emojis!
- Cute pictures of cats, dogs and many more!
- Moderation commands
- Anime facts
- Search a user trough MAL
- Music player
- And useless commands !

## License
```
MIT License

Copyright (c) 2021 Rapougnac

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Author

Authored and maintained by Rapougnac.

> GitHub [@Rapougnac](https://github.com/Rapougnac)
