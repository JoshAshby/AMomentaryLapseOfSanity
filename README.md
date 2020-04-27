# A Momentary Lapse of Sanity

A little toy to scrape websites on a given frequency and pull out a list of
values using CSS selectors. Eventually might include a small API and browser
extension to build out the scrape configs.

Uses Sequel, Ferrum, LocalJob, Rufus::Scheduler and TTY::Logger, along with
Roda for the web interface and zeitwerk for autoloading.
