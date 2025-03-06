class CustomExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.projectData = { id: '', type: '' };
        this.runtime.on('PROJECT_LOADED', () => this.loadProjectData());
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
        if (this.runtime && this.runtime.targets) {
            const stage = this.runtime.getEditingTarget();
            if (stage) {
                stage.variables['__customProjectData__'] = {
                    id: '__customProjectData__',
                    type: 'string',
                    value: JSON.stringify(this.projectData)
                };
            }
        }
    }

    loadProjectData() {
        if (this.runtime && this.runtime.targets) {
            const stage = this.runtime.getEditingTarget();
            if (stage && stage.variables['__customProjectData__']) {
                try {
                    this.projectData = JSON.parse(stage.variables['__customProjectData__'].value);
                } catch (e) {
                    console.error('Failed to parse stored project data:', e);
                }
            }
        }
    }
}

Scratch.extensions.register(new CustomExtension());