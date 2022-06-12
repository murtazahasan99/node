const bar = () => console.log('bar1')

const baz = () => console.log('baz')

const foo = () => {
    console.log('foo')
    setTimeout(bar, 0)

    new Promise((resolve, reject) =>
        resolve('should be right after baz, before bar')
    ).then(resolve => {
        console.log(resolve);
        setTimeout(() => console.log('bar2'), 0)
    });

    setImmediate(() => {
        console.log('immediate');
    })
    
    baz()
    for (let index = 0; index < 10000000000; index++) {
        const element = index;
        
    }
}

foo()