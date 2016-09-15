import postcss from 'postcss';
import patterns from './data/__data__.js';

const pluginName = 'postcss-css3patterns';

const plugin = postcss.plugin(pluginName, () => {
    return (css) => {
        css.walkDecls('background-pattern', (decl) => {
            const patternName = decl.value.replace(/[\"\']/g, '');
            const pattern = patterns.reduce((acc, curr) => {
                return (curr.name === patternName) ? curr : acc;
            });
            if (typeof pattern !== 'undefined') {
                const origRule = decl.parent;
                origRule.append(pattern.css);
            }
            decl.remove();
        });
    };
});

export default plugin;
