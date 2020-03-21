const purgecss = require('@fullhuman/postcss-purgecss')({
    // Specify the paths to all of the template files in your project 
    content: [
        './public/**/.html',
        './src/**/*.html',
        './src/**/*.vue',
        './src/**/*.jsx',
        // etc.
    ],

    // Include any special characters you're using in this regular expression
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
})

module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer')({
            add: true,
            grid: false
        }),
        ...process.env.NODE_ENV === 'production'
            ? [purgecss]
            : []
    ]
}