class TestExtension {
    getInfo() {
        return {
            id: 'testExtension',
            name: 'Test Extension',
            blocks: [
                {
                    opcode: 'addComment',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'コメントを追加'
                }
            ]
        };
    }

    addComment() {
        const workspace = Scratch.vm.runtime._editingTarget.sprite.clones[0].customBlocks.workspace;
        if (workspace) {
            workspace.addComment("テスト", 10, 10);
        }
    }
}

Scratch.extensions.register(new TestExtension());
