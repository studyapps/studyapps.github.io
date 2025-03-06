class CustomExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.projectData = {};
    }

    getInfo() {
        return {
            id: 'customExtension',
            name: 'Custom Blocks',
            blocks: [
                {
                    opcode: 'setID',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'Set ID [ID]',
                    arguments: {
                        ID: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '12345'
                        }
                    }
                },
                {
                    opcode: 'setType',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'Set Type [TYPE]',
                    arguments: {
                        TYPE: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'typeMenu'
                        }
                    }
                }
            ],
            menus: {
                typeMenu: {
                    acceptReporters: true,
                    items: ['Trial', 'Basic']
                }
            }
        };
    }

    setID(args, util) {
        this.projectData.id = args.ID;
        this.saveToProject(util);
    }

    setType(args, util) {
        this.projectData.type = args.TYPE;
        this.saveToProject(util);
    }

    saveToProject(util) {
        if (util.target && util.target.blocks) {
            util.target.blocks._blocks['__customProjectData__'] = {
                id: '__customProjectData__',
                opcode: 'data_variable',
                fields: {
                    VARIABLE: { name: '__customProjectData__' }
                },
                shadow: true,
                topLevel: true,
                value: JSON.stringify(this.projectData)
            };
        }
    }

    loadProjectData(util) {
        if (util.target && util.target.blocks) {
            const block = util.target.blocks._blocks['__customProjectData__'];
            if (block && block.value) {
                this.projectData = JSON.parse(block.value);
            }
        }
    }
}

Scratch.extensions.register(new CustomExtension());