import { configure } from "mobx";

//https://mobx.js.org/configuration.html

console.info('mobx configure');

configure({
    enforceActions: "always",
    computedRequiresReaction: true,
                    // reactionRequiresObservable: true,
    observableRequiresReaction: true,
    disableErrorBoundaries: false
});

export const initIndexConfig = () => {
    console.info('initIndexConfig');
};