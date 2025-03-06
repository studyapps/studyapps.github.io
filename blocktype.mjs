class CustomExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.projectData = { id: '12345', type: 'Trial' };
        this.loadProjectData();
    }

    getInfo() {
        return {
            id: 'customExtension',
            name: 'Custom Variables',
            blocks: [
                {
                    opcode: 'getID',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'ID',
                },
                {
                    opcode: 'getType',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Type',
                },
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

    getID() {
        return this.projectData.id;
    }

    getType() {
        return this.projectData.type;
    }

    setID(args) {
        this.projectData.id = args.ID;
        this.saveToProject();
    }

    setType(args) {
        this.projectData.type = args.TYPE;
        this.saveToProject();
    }

    saveToProject() {
        const data = JSON.stringify(this.projectData);
        localStorage.setItem('__customProjectData__', data);
    }

    loadProjectData() {
        const savedData = localStorage.getItem('__customProjectData__');
        if (savedData) {
            try {
                this.projectData = JSON.parse(savedData);
            } catch (e) {
                console.error('Failed to parse saved project data:', e);
            }
        }
    }
}

Scratch.extensions.register(new CustomExtension());