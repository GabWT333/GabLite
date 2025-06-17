//editato da chatunity
const commands = [];

const cmd = (info, func) => {
    const data = {
        ...info,
        function: func,
        dontAddCommandList: info.dontAddCommandList ?? false,
        desc: info.desc ?? '',
        fromMe: info.fromMe ?? false,
        category: info.category ?? 'misc',
        filename: info.filename ?? "Not Provided"
    };
    commands.push(data);
    return data;
};

export default {
    cmd,
    commands,
    AddCommand: cmd,
    Function: cmd,
    Module: cmd
};

module.exports = {
    cmd,
    commands,
    AddCommand: cmd,
    Function: cmd,
    Module: cmd
};