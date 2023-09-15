(function(Scratch) {
  'use strict';

  const vm = Scratch.vm

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('\'Sprite Parenting\' must run unsandboxed!');
  }

  const icon = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMTI4IDEyOCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTI4IDEyODsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGcgaWQ9Il94MzhfIj4NCgk8cGF0aCBpZD0iaWNvbl8xMl8iIHN0eWxlPSJmaWxsOiMyQTJCMkI7IiBkPSJNMTEyLjYzNiw5My41OTN2LTE4LjE2SDY3LjE3NFY2NC44NDFoMjkuNjk5YzQuNjI0LDAsOC40MDctMy43ODMsOC40MDctOC40MDdWMTkuNzE1DQoJCWMwLTQuNjI0LTMuNzgzLTguNDA3LTguNDA3LTguNDA3SDMxLjE5MWMtNC42NDUsMC04LjQwNywzLjc4My04LjQwNyw4LjQwN3YzNi43MTljMCw0LjYyNCwzLjc2Miw4LjQwNyw4LjQwNyw4LjQwN2gyOS42Nzd2MTAuNTkzDQoJCUgxNS40Mjd2MTguMTZIMHYyMy4wOTloMzcuNDU0VjkzLjU5M0gyMS43MzNWODEuNzM5aDM5LjEzNnYxMS44NTRINDUuMjczdjIzLjA5OWgzNy40NTRWOTMuNTkzSDY3LjE3NFY4MS43MzloMzkuMTU3djExLjg1NA0KCQlIOTAuNTQ2djIzLjA5OUgxMjhWOTMuNTkzSDExMi42MzZ6IE0zMS4xOTEsNTYuNDM0VjE5LjcxNWg2NS42ODFsLTAuMDIxLDM2LjcxOUgzMS4xOTF6Ii8+DQo8L2c+DQo8ZyBpZD0iTGF5ZXJfMSI+DQo8L2c+DQo8L3N2Zz4NCg=="

  class SpriteParenting {
      getInfo() {
        return {
          id: 'spriteparenting',
          name: 'Sprite Parenting',
          menuIconURI: icon,
          blockIconURI: icon,
          blocks: [
            {
              opcode: 'parent_sprites',
              blockType: Scratch.BlockType.COMMAND,
              text: 'parent sprite [ONE] to [TWO]',
              filter: [Scratch.TargetType.SPRITE],
              arguments: {
                ONE: {
                  type: Scratch.ArgumentType.STRING,
                  menu: 'SPRITE_PARENT_MENU'
                },
                TWO: {
                  type: Scratch.ArgumentType.STRING,
                  menu: 'SPRITE_PARENT_MENU'
                }
              }
            },
            {
              opcode: 'unparent_sprites',
              blockType: Scratch.BlockType.COMMAND,
              text: 'unparent sprite [ONE] from [TWO]',
              filter: [Scratch.TargetType.SPRITE],
              arguments: {
                ONE: {
                  type: Scratch.ArgumentType.STRING,
                  menu: 'SPRITE_PARENT_MENU'
                },
                TWO: {
                  type: Scratch.ArgumentType.STRING,
                  menu: 'SPRITE_PARENT_MENU'
                }
              }
            },
            {
              opcode: 'unparent_all',
              blockType: Scratch.BlockType.COMMAND,
              text: 'unparent all sprites from sprite [ONE]',
              filter: [Scratch.TargetType.SPRITE],
              arguments: {
                ONE: {
                  type: Scratch.ArgumentType.STRING,
                  menu: 'SPRITE_PARENT_MENU'
                },
              }
            }
          ],
          menus: {
            SPRITE_PARENT_MENU: {
              acceptReporters: true,
              items: "getSprites"
            }
          }
        };
      }

      getSprites() {
        let spriteNames = [];
        spriteNames.push({
          text: 'myself',
          value: 'myself',
        });
        const targets = Scratch.vm.runtime.targets;
        const myself = Scratch.vm.runtime.getEditingTarget().sprite.name;
        for (let index = 1; index < targets.length; index++) {
          const curTarget = targets[index].sprite;
          let display = curTarget.name;
          if (myself === curTarget.name) {
            continue;
          }
          if (targets[index].isOriginal) {
            const jsonOBJ = {
              text: display,
              value: curTarget.name,
            };
            spriteNames.push(jsonOBJ);
          }
        }
        if (spriteNames.length > 0) {
          return spriteNames;
        } else {
          return [{ text: "", value: 0 }]; //this should never happen but it's a failsafe
        }
      }
      
    
      parent_sprites(args, util) {
        let target1 = Scratch.Cast.toString(args.ONE) == 'myself' ? util.target.getId() : 'idk lol';
        let target2 = Scratch.Cast.toString(args.TWO) == 'myself' ? util.target.getId() : 'idk lol';
        target1['parentedTo'] = target2
        target2['children'].push(target1)
      }
      unparent_sprites(args) {    
        let target1 = Scratch.Cast.toString(args.ONE) == 'myself' ? util.target.getId() : 'idk lol';
        let target2 = Scratch.Cast.toString(args.TWO) == 'myself' ? util.target.getId() : 'idk lol';
        //todo: remove the stuff lol
      }
      unparent_all(args) {    
        let target1 = Scratch.Cast.toString(args.ONE) == 'myself' ? util.target.getId() : 'idk lol';
        //todo: loop through each child and remove the parented to
        target2['children'] = ''
      }
    }
    Scratch.extensions.register(new SpriteParenting());
})(Scratch);